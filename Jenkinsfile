pipeline {
  agent any

  tools {
    go 'Go 1.18'
    nodejs 'NodeJS 16'
  }

  stages {
    stage('Build') {
      steps {
        scmSkip(deleteBuild: true, skipPattern:'.*\\[skip ci\\].*')

        withEnv(['HUGO_HOME=E:\\software_install\\hugo']) {
          nodejs(cacheLocationStrategy: executor(), nodeJSInstallationName: 'NodeJS 16') {
            bat '%HUGO_HOME%\\hugo --gc --minify --cleanDestinationDir -b https://siaikin.github.io/'
            bat '.\\third_party\\pagefind.exe  --source public'
            fileOperations([folderCopyOperation(sourceFolderPath: 'public', destinationFolderPath: 'docs')])
          }

          withCredentials([gitUsernamePassword(credentialsId: 'b2cddbd6-2b47-4290-b75f-5f4d66be7ba1', gitToolName: 'Default')]) {
            bat 'git config user.email abc131054026@outlook.com'
            bat 'git config user.name "siaikin\'s Jenkins"'
            bat 'git checkout master --force'
            bat 'git reset --hard origin/master'
            bat 'git add .'
            bat 'git commit -m "Update Blog [skip ci]"'
            bat 'git push'
          }
        }

        cleanWs()
      }
    }
  }
}
