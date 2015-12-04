# lambda-scriptfodder-giveaccess
Used to create an Amazon AWS Lambda to upload things. To use:
- Set up AWS Credentials in ~/.aws/credentials
- Copy config.env.default to config.env.production and fill in your SF cookie (use something like EditThisCookie for chrome to fetch)
- Give the account full lambda access in AWS IAM
- Create a basic execution role for lambdas, insert the role ARN into gulpfile.js (line 13)
- npm install

To package and upload to AWS run 
gulp

To use call the handler with 
{
  scripts: "123,3232,123", //NO SPACES, comma seperated list
  steam_id: "769423235123234"
}
