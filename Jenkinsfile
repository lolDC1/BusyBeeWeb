pipeline {
    agent any
    environment {
            DOCKER_IMAGE = 'loldc1/busybee.web'
            DOCKERHUB_CREDENTIALS = credentials('dockerhub') // specify in jenkins
            SSH_HOSTNAME_CREDENTIALS = credentials('backend') // specify in jenkins
            REMOTE_DIR = '/home/user'
        }   
    stages {
        stage("Build docker image") {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }
        stage("Push to Docker Hub") {
            steps {
                script {
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login --username $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                    sh 'docker push $DOCKER_IMAGE'
                }
            }
        }
        stage("Deploy") {
            steps {
                sshagent(['ssh_key']){ // specify in jenkins
                    sh '''
                        scp -o StrictHostKeyChecking=no docker-compose.yml $SSH_HOSTNAME_CREDENTIALS:$REMOTE_DIR/
                        scp -o StrictHostKeyChecking=no deploy_script $SSH_HOSTNAME_CREDENTIALS:$REMOTE_DIR/
                        ssh -o StrictHostKeyChecking=no $SSH_HOSTNAME_CREDENTIALS "echo $DOCKERHUB_CREDENTIALS_PSW | docker login --username $DOCKERHUB_CREDENTIALS_USR --password-stdin"
                        ssh -o StrictHostKeyChecking=no $SSH_HOSTNAME_CREDENTIALS "$REMOTE_DIR/deploy_script"
                    '''
                }
            }
        }
    }
}