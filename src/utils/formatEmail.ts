export default function formatEmail( email : string) : string {
  if(!email) return '';
  const [username, domain] = email.split("@")
  if (username.length <= 2) {
    return username[0] + "*" + "@" + domain
  }
  const formattedUsername = username[0] + "*".repeat(username.length - 2) + username[username.length - 1];
  return `${formattedUsername}@${domain}`
}