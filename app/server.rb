require 'sinatra'
require 'aws/s3'
require 'paperclip'

set :public_dir, Proc.new { File.join(root, "..", "public") }

get '/' do
	s3_connect
	all_files
	title_name
	erb :index
end

private

def s3_connect 
	AWS::S3::Base.establish_connection!(
	:access_key_id => ENV['AWS_ACCESS_KEY_ID'],
	:secret_access_key => ENV['AWS_SECRET_ACCESS_KEY']
)
end

def title_name
	@tank = get_asset('TankShort.mp4').key
	@chill = get_asset('calmcraig.png').key
	@bling = get_asset('shark.gif').key
	@sharkswim = get_asset('giphy.gif').key
	@hammerhead = get_asset('hammerhead.gif').key
	@jellygif = get_asset('jelly.gif').key
	@jelly_gif_two = get_asset('jelly2.gif').key
	@aquarium_audio = get_asset('aquarium.mp3').key
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