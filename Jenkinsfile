pipeline {
    agent any 
    environment {
        DOCKER_TAG = getDockerTag()
        DOCKERHUB_CREDENTIALS = credentials('rahul-dockerhub-login')
    }
    stages {
        stage('check user') {
            steps {  
                sh '$USER'
            }
        }
        stage('SCM Checkout') {
            steps{
            git credentialsId: 'github-rahul', url: 'https://github.com/Jenkins1977/nodejs-demo.git'
            }
        }

        stage('Build docker image') {
            steps {  
                //sh 'docker build -t rahultew/nodeapp:$BUILD_NUMBER .'
                sh 'docker build -t rahultew/nodeapp:${DOCKER_TAG} .'
            }
        }
        stage('login to dockerhub') {
            steps{
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }
        stage('push image') {
            steps{
                //sh 'docker push rahultew/nodeapp:$BUILD_NUMBER'
                sh 'docker push rahultew/nodeapp:${DOCKER_TAG}'
            }
        }
        stage("deploy 8"){
            steps{
                sh "chmod +x changeTag.sh"
                sh "./changeTag.sh ${DOCKER_TAG}"

                sshagent(['deploy_user']) {
                   	sh "scp -o StrictHostKeyChecking=no service.yml deployment.yml centos@15.207.83.20:/home/centos/"
			script{
				try{
                     //sh "alias kubectl='minikube kubectl --'"
				     sh "ssh centos@15.207.83.20 minikube kubectl -- apply -f ."
				}catch(error){
                     //sh "alias kubectl='minikube kubectl --'"
				     sh "ssh centos@15.207.83.20 minikube kubectl -- apply -f ."
				}
			}
                }
            }
        }
}
post {
        always {
            sh 'docker logout'
        }
    }
}

def getDockerTag(){
    def tag  = sh script: 'git rev-parse HEAD', returnStdout: true
    return tag
}

