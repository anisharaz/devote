function NumberOfVotes({ params }: { params: { votinglevelid: string } }) {
  return (
    <div className="main-body flex flex-col justify-center items-center">
      <div>{params.votinglevelid}</div>
    </div>
  );
}

export default NumberOfVotes;
