# lambda-scriptfodder-giveaccess
Used to create an Amazon AWS Lambda to upload things. To use:
- Set up AWS Credentials in ~/.aws/credentials
- Copy config.env.default to config.env.production and fill in your SF cookie (use something like EditThisCookie for chrome to fetch)
- Give the account full lambda access in AWS IAM
- Create a basic execution role for lambdas, insert the role IAM into gulpfile.js (line 13)
- npm install

To package and upload to AWS run 
gulp
