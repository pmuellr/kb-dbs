#/usr/bin/env bash

# convert file to a data url
# see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs

FILE=$1
MEDIA_TYPE=$2

# check if FILE is set, if it isn't, print help
[ -z "FILE" ] && { printHelp; }

# check if MEDIA_TYPE is set, if it isn't, exit with a message and error code 1
[ -z "$MEDIA_TYPE" ] && { >&2 echo "media-type expected as second parameter"; exit 1; }

# check if FILE exists, if it doesn't, exit with a message and error code 1
[ ! -f "$FILE" ] && { >&2 echo "file '$FILE' not found"; exit 1; }

# base64 encode the file contents, setting in variable ENCODED_FILE 
ENCODED_FILE=$(base64 -i $FILE)

# data:[<mediatype>][;base64],<data>
echo "data:$MEDIA_TYPE;base64,$ENCODED_FILE"

# function to print help and exit with error code 1
function printHelp {
    >&2 echo "usage: $0 <file> <media-type>"
    >&2 echo ""
    >&2 echo "writes the file contents as a data URL to stdout"
    >&2 echo ""
    >&2 echo "  <file>:       the file to be converted to a data url"
    >&2 echo "  <media-type>: the media type of the file"
    exit 1
}