pipeline {
    agent {
        docker {
            image 'node:6-alpine'
            args '-p 3000:3000'
        }
    }
    stages {
        stage('Build') {
            steps {
		sh 'cd backend-kb' 
                sh 'npm install'
            }
        }
	stage('Run') {
	    steps {
		sh 'cd backend-kb'
		sh 'npm start'
	    }
	}
    }
}