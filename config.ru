require 'rubygems'
require_relative './app/server.rb'
use Rack::Deflater
run Sinatra::Application

