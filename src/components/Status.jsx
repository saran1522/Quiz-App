export default function Status({ status }) {
  return (
    <div className="err-status">
      <h3>
        {status === "loading"
          ? "Loading Questions..."
          : "Error in fetching questions ❗❗  "}
      </h3>
    </div>
  );
}
