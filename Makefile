
PROGRAM = lynxari-propagate-application

HOMEDIR = ../../../..

DISTDIR = $(HOMEDIR)/dist/lynxari/$(PROGRAM)

all: dist

dist:
	@mkdir -p $(DISTDIR)
	-cp *.js* $(DISTDIR)
	-cp LICENSE $(DISTDIR)
	