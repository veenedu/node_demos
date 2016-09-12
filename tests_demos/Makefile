REPORTER = list
MOCHA_OPTS = --ui bdd -c

test:
	clear
	echo Starting test ************
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	$(MOCHA_OPTS) \
	codes/*.spec.js
	echo Ending test

testwatch:
	clear
	echo Starting test ************
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	$(MOCHA_OPTS) \
	--watch \
	codes/*.spec.js
	echo Ending test

.PHONY: test
