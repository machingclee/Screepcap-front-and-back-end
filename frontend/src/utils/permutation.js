export default function permutation(n) {
  const seq = [];
  const newSeq = [];
  for (let i = 0; i < n; i++) {
    seq.push(i);
  }
  for (let stage = 0; stage < n; stage++) {
    const dropIndex = Math.floor((seq.length - stage) * Math.random());
    newSeq.push(seq.splice(dropIndex, 1)[0]);
  }
  return newSeq;
}
