#! /usr/local/bin/python3
import boto3
import sys 
import os

def execute_commands_on_linux_instances(client, commands, instance_ids):
    region = os.environ["S3_REGION"]
    output_bucket = os.environ["OUTPUT_BUCKET"]
    role_arn = os.environ["ROLE_ARN"]
    notification_arn = os.environ["NOTIFICATION_ARN"]
    
    resp = client.send_command(
        DocumentName="AWS-RunShellScript", 
        Parameters={
            'commands': commands,
            'workingDirectory': ['~']
        },
        OutputS3Region=region,
        OutputS3BucketName=output_bucket,
        ServiceRoleArn=role_arn,
        NotificationConfig= {
            'NotificationArn': notification_arn,
            'NotificationEvents': ["Failed", "TimedOut", "Cancelled"],
            'NotificationType': "Command"
        },
        InstanceIds=instance_ids,
    )

def getTaggedInstances(client, value):
    allInstancesWithTag = client.describe_instances(Filters=[{
            'Name': 'tag:aws:cloudformation:stack-name',
            'Values': [value]
        }])['Reservations']
    instanceGroups = [instanceGroup['Instances'] for instanceGroup in allInstancesWithTag]
    instances = [instance for instanceGroup in instanceGroups for instance in instanceGroup]

    return [instance['InstanceId'] for instance in instances if instance['State']['Code'] == 16]


if len(sys.argv) < 4:
    print("Insuffecient parameters, requires instance tag, S3 hosted script location, and the tag for the docker container.")
    sys.exit(1)

tag = sys.argv[1]
script_location = sys.argv[2]
docker_tag = sys.argv[3]

bucket, path = script_location.split("/", 1)

ssm_client = boto3.client('ssm') 
ec2_resource = boto3.client("ec2")
s3_client = boto3.client("s3")


script = s3_client.get_object(Bucket=bucket, Key=path)["Body"].read().decode("utf8").replace("~TAG~", docker_tag)

commands = [script]
instance_ids = getTaggedInstances(ec2_resource, tag)
print(instance_ids)

if len(instance_ids) < 1:
    print("No instances tagged with this tag are running")
    sys.exit(1)

execute_commands_on_linux_instances(ssm_client, commands, instance_ids)
