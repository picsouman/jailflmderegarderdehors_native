SRC_PATH="server"

rm -rf $SRC_PATH
mkdir $SRC_PATH
cd $SRC_PATH || exit

git clone https://github.com/picsouman/jailflmderegarderdehors_native .

npm install --force
npm start &

sleep 10

@xset s off
@xset -dpms
@xset s noblank
@chromium-browser --kiosh http://localhost:3000