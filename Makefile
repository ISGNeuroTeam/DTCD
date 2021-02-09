define ANNOUNCE_BODY
Required section:
 build - build project into build directory, with configuration file and environment
 clean - clean all addition file, build directory and output archive file
 test - run all tests
 pack - make output archivne
Addition section:
endef

PROJECT_NAME = WebGUI
MOCK_SERVER_NAME = WebGUI-server

GENERATE_VERSION = $(shell jq .version ./client/package.json )
GENERATE_BRANCH = $(shell git name-rev $$(git rev-parse HEAD) | cut -d\  -f2 | sed -re 's/^(remotes\/)?origin\///' | tr '/' '_')

SET_VERSION = $(eval VERSION=$(GENERATE_VERSION))
SET_BRANCH = $(eval BRANCH=$(GENERATE_BRANCH))

.SILENT:

COMPONENTS :

export ANNOUNCE_BODY
all:
	echo "$$ANNOUNCE_BODY"

pack: build
	$(SET_BRANCH)
	$(SET_VERSION)
	echo Create archive \"$(PROJECT_NAME)-$(VERSION)-$(BRANCH).tar.gz\"
	cd build; tar czf ../$(PROJECT_NAME)-$(VERSION)-$(BRANCH).tar.gz .

build: client/node_modules $(COMPONENTS)
	# required section
	echo Build!
	$(SET_VERSION)
	echo Start command: npm run build
	npm run build --prefix ./client
	mkdir build
	mkdir build/client
	cp -r ./client/dist/* ./build/client
	cp README.md build/
	cp CHANGELOG.md build/
	cp LICENSE.md build/

clean:
	# required section"
	$(SET_VERSION)
	$(SET_PROJECT_NAME)
	rm -rf build ./client/dist ./client/node_modules/ ./*-lock.* ./client/*-lock.* $(PROJECT_NAME)-*.tar.gz \
	./server/__pycache__ ./server/venv ./server/*_log.* \
	./public

test: client/node_modules
	# required section
	echo "Testing..."
	echo WebGUI client
	npm run --prefix ./client test
	
dev: client/node_modules venv $(COMPONENTS)
	echo Development mode!
	npm run build --prefix ./client
	cd ./server; ./venv/bin/python  main.py > session_log.txt &
	npm run dev --prefix ./client

venv:
	echo Start installing virtualenv
	python3 -m venv ./server/venv
	cd ./server; ./venv/bin/pip3 install -r requirements.txt

client/node_modules:
	echo Start command for client : npm i
	npm i --prefix ./client
