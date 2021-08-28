SHELL := bash

SAIL = ./backend/vendor/bin/sail

default: start

start:
	${SAIL} up

stop:
	${SAIL} down
