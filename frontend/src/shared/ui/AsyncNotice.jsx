export default function AsyncNotice({ loading, error }) {
  if (loading) return <div className="notice-box">Loading fresh numbers...</div>;
  if (error) return <div className="notice-box error">{error}</div>;
  return null;
}
