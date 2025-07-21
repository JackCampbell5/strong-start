/**
 * Checks if a session is active and creates one if it doesn't exist
 * + If a response is provided, check if the user is logged in and give a 401 if not
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns
 */
export function checkSession(req, res = null) {
  if (!req.session.sessionUUID) {
    req.session.sessionUUID = crypto.randomUUID();
  }
  if (res) {
    if (!req.session.employee) {
      res.status(401).send("Unauthorized: Please log in");
    }
  }
  return [req, res];
}
