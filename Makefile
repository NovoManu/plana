SHELL := bash

SAIL = ./backend/vendor/bin/sail

default: start

start:
	${SAIL} up

stop:
	${SAIL} down

run_frontend:
	cd frontend; npm run serve;

run_frontend_tests:
	cd frontend; npm run test;
