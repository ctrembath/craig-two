require 'sinatra'
require 'aws/s3'
require 'paperclip'


set :public_dir, Proc.new { File.join(root, "..", "public") }

get '/' do
	# S3 settings
	s3_connect
	all_files
	puts @my_bucket
	@file = get_asset('TankShort.mp4')
	@key = @file.key.to_s
	erb :index
end


private

def s3_connect 
	AWS::S3::Base.establish_connection!(
	:access_key_id => ENV['AWS_ACCESS_KEY_ID'],
	:secret_access_key => ENV['AWS_SECRET_ACCESS_KEY']
)
end

def all_files
	s3_connect
	@my_bucket = AWS::S3::Bucket.find('plunge')
end

def get_asset(asset)
	s3_connect
	media = AWS::S3::S3Object.find(asset, 'plunge')
	return media
end