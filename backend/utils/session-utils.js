/**
 * Checks if a session is active and creates one if it doesn't exist
 * + If a response is provided, check if the user is logged in and give a 401 if not
 * @param {object} req - The request object
 * @returns The request object with a sessionUUID
 */
export function checkSession(req) {
  if (!req.session.sessionUUID) {
    req.session.sessionUUID = crypto.randomUUID();
  }
  return req;
}

/**
 * Checks if a session is active and creates one if it doesn't exist and checks if the user is logged in and gives a 401 if not
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns The request and response objects
 */
export function checkLogin(req, res) {
  req = checkSession(req);
  if (!req.session.employee) {
    res.status(401).send("Unauthorized: Please log in");
  }
  return [req, res];
}
