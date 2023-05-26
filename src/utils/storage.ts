import { Web3Storage } from "web3.storage";

const toks =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiJkaWQ6ZXRocjoweDYzRDdFRUI5NjQ3NWUwYjcxMjYxYTJhMjJGQWM1OTRGRTY2RjRkNzkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzUxODU3NTk1NDksIm5hbWUiOiJGaWxsaW9uIn0ZgOQRRLkkRk8uchRIjrrof5zAuoBnqIA4WSAPJNESMk";

const client = new Web3Storage({ token: toks });

export const getJSONFromFileinCID = async (_cid: any) => {
  const res = await client.get(_cid);
    const filesArr = await res?.files(); // Web3File[]
    if (filesArr) {
        let abc = filesArr[0].cid;
        const data = await fetch(`https://${abc}.ipfs.w3s.link`).then((dets) =>
            dets.json()
        );
        return data;
    }
    return null
};

export const getJSONFromCID = async (_cid: any) => {
  const json = await client.get(_cid);
  return json;
};
