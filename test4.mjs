  import zlib  from 'zlib';
  import { promisify } from 'util';


const buffer = Buffer.from('aGVsbG8=', 'base64');

const gzip = promisify(zlib.gzip);

const do_unzip = promisify(zlib.unzip);

//do_unzip
gzip(buffer)
  .then((buf) => console.log(buf.toString()))
  .catch((err) => {
    console.error('An error occurred:', err);
    process.exitCode = 1;
  });