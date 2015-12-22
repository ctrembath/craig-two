require 'sinatra'
require 'aws/s3'


set :public_dir, Proc.new { File.join(root, "..", "public") }


# def find_aws_file(title)
# 	s3_connect

# 	asset = AWS::S3::S3Object.find(title, 'plunge')
# 	return asset
# end


get '/' do
	# S3 settings
	s3_connect
	# all_files
	erb :index
end


private

def s3_connect 
	AWS::S3::Base.establish_connection!(
	:access_key_id => ENV['AWS_ACCESS_KEY_ID'],
	:secret_access_key => ENV['AWS_SECRET_ACCESS_KEY']
	# s3_endpoint: 'eu-west-1'
)
end

def all_files
	s3_connect
	@my_bucket = AWS::S3::Bucket.find('itching')
	all_assets = @my_bucket.objects
	puts all_assets.length
end