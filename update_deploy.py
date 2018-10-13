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
        DocumentName="AWS-RunShellScript", # One of AWS' preconfigured documents
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
    return resp

def getTaggedInstances(client, value):
    instance_ids = []
    for instance in client.instances.all():
        for tag in instance.tags:
            if tag["Key"] == "aws:cloudformation:stack-name":
                if tag["Value"] == value:
                    instance_ids.append(instance.id)
    return instance_ids


if len(sys.argv) < 3:
    print("Insuffecient parameters, requires tag and script.")
    sys.exit(1)

tag = sys.argv[1]
script_location = sys.argv[2]
docker_tag = os.environ["DOCKER_TAG"]

print(docker_tag)

bucket, path = script_location.split("/", 1)

ssm_client = boto3.client('ssm') 
ec2_resource = boto3.resource("ec2")
s3_client = boto3.client("s3")


script = s3_client.get_object(Bucket=bucket, Key=path)["Body"].read().decode("utf8").replace("~TAG~", docker_tag)

commands = [script]
instance_ids = getTaggedInstances(ec2_resource, tag)

execute_commands_on_linux_instances(ssm_client, commands, instance_ids)
