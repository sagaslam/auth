import jwt from 'jsonwebtoken';

// Don't check secrets into the repository for production projects.
// Use for example environment variables instead.
const TOKEN_SECRET = '12345678';

export default class Session {
  constructor(request, response) {
    this.request = request;
    this.response = response;
    this.userid = null;

    // const { sessionToken } = request.cookies;
    // this.initFromToken(sessionToken);
  }

  initFromToken(sessionToken) {
    if (!sessionToken) {
      return;
    }

    try {
      const { userid } = jwt.verify(this.request.cookies, TOKEN_SECRET);
      this.userid = userid;
    } catch (error) {
      console.error('Error decoding session token', error);
    }
  }

  retrieveFromToken() {
    const { sessionToken } = this.request.cookies;

    console.log('session token ' + sessionToken);
    // try {
    const sessionValues = jwt.verify(sessionToken, TOKEN_SECRET);
    console.log('session values ' + JSON.stringify(sessionValues));
    // } catch (error) {
    //   console.error('Error decoding session token', error);
    // }
    return sessionValues;
  }

  update(user) {
    //console.log('update' + JSON.stringify(user));
    if (!user) {
      return;
    }

    this.userid = user.userid;

    const sessionToken = jwt.sign({ userid: user.userid }, TOKEN_SECRET, {
      expiresIn: '2h',
    });
    const cookieOptions = {
      httpOnly: true,
      sameSite: 'None',
      // use secure flag in production to send only via encrypted connections
      secure: true,
    };
    //console.log(`sessiontoken : ${sessionToken}`);
    this.response.cookie('sessionToken', sessionToken, cookieOptions);
    // eslint-disable-next-line consistent-return
    return sessionToken;
  }
}
