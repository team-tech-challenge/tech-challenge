module "application" {
  source = "./modules/generic"

  project_name              = "tech-challenge"
  create_aws_ecr_repository = false
}
