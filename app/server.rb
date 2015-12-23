require 'sinatra'
require 'aws/s3'
require 'paperclip'

set :public_dir, Proc.new { File.join(root, "..", "public") }

get '/' do
	s3_connect
	all_files
	title_name
	craigs_albums
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
	@jelly = get_asset('jelly.mp4').key
	@cliff = get_asset('cliff.mp4').key
	@risenfall = get_asset('risefall.mp4').key
	@chill = get_asset('calmcraig.png').key
	@craig_audio = get_asset('craigshortX.mp3').key
	@bling = get_asset('shark.gif').key
	@sharkswim = get_asset('giphy.gif').key
	@hammerhead = get_asset('hammerhead.gif').key
	@iphone = get_asset('iphonewcraig.png').key
end

def craigs_albums
	@one = get_asset('craig1.jpg').key
	@two = get_asset('craig2.jpg').key
	@three = get_asset('craig3.jpg').key
	@four = get_asset('craig4.jpg').key
	@five = get_asset('craig5.jpg').key
	@six = get_asset('craig6.jpg').key
	@seven = get_asset('craig7.jpg').key
	@eight = get_asset('craig8.jpg').key
	@nine = get_asset('craig9.jpg').key
	@ten = get_asset('craig10.jpg').key
	@eleven = get_asset('craig11.jpg').key
	@twelve = get_asset('craig12.jpg').key
	@thirteen = get_asset('craig13.jpg').key
	@fourteen = get_asset('craig14.jpg').key
	@fifteen = get_asset('craig15.jpg').key
	@sixteen = get_asset('craig16.jpg').key
	@seventeen = get_asset('craig17.jpg').key
	@eighteen = get_asset('craig18.jpg').key
	@nineteen = get_asset('craig19.jpg').key
	@twenty = get_asset('craig20.jpg').key
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