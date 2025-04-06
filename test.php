<?php
header('Content-Type: audio/x-mpegurl');

$url = $_GET['url'] ?? 'https://live-la5.aws-stream.com:9318/v3/H0bftUpGStugQb75y_LnbA/1743948992/5a4a06c4c9dec85ca749eb9760529f8d/dv8sn5kmPQIIUWk59lsZZQ/1743970572/live/vx-origin/uflix-epl1_720/chunks.m3u8';

echo "#EXTM3U\n";
echo "#EXTINF:-1 group-title=\"กีฬา\" tvg-logo=\"https://rentapi.blackboxsys.net/images/png/epl-1.png\",EPL 01\n";
echo "#EXTVLCOPT:http-referrer=https://cloud.ufxtv.com/\n";
echo "#EXTVLCOPT:http-user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36\n";
echo "#EXTVLCOPT:http-origin=https://cloud.ufxtv.com\n";
echo "#EXTVLCOPT:http-accept=*/*\n";
echo "#EXTVLCOPT:http-accept-encoding=gzip, deflate, br, zstd\n";
echo "#EXTVLCOPT:http-accept-language=en-US,en;q=0.9,th;q=0.8\n";
echo $url . "\n";
