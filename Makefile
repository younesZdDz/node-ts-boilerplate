BASEDIR=$(CURDIR)

SITE_NAME=node-ts-boilerplate
USER_NAME=younesZdDz
REPO_NAME=$(USER_NAME)/$(SITE_NAME)

SHA := $(shell git rev-parse --short HEAD)
DEPLOY_TIME := $(shell date -u +"%Y-%m-%dT%H-%M-%SZ_%s")
HOST := $(shell hostname)

test:
	npm run-script test

dockerbuild:
	docker build -t $(SITE_NAME):latest .

dockerpush:
	docker login -u $(DOCKER_USER) -p $(DOCKER_PASSWORD)
	docker tag $(SITE_NAME) $(DOCKER_USER)/$(SITE_NAME):latest
	docker tag $(SITE_NAME) $(DOCKER_USER)/$(SITE_NAME):$(SHA)
	docker push $(DOCKER_USER)/$(SITE_NAME):latest
	docker push $(DOCKER_USER)/$(SITE_NAME):$(SHA)

tag:
	git tag "$(DEPLOY_TIME)_$(SHA)"
	git push https://${GH_TOKEN}@github.com/$(REPO_NAME) $(DEPLOY_TIME)_$(SHA)

deploy: test dockerbuild tag dockerpush 

.PHONY: test deploy
