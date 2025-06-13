const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { refreshTokenMethods } = require("../../db/authQueries");


const logout = asyncHandler(async (req, res, next) => {
  // note: on client, also delete the accessToken

  //get cookies where the refreshToken lives
  //cookies only accessible when cookie-parser is invoke
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(204).json({
      status: 204,
      message: "No Content",
    });
  }

  const refreshToken = cookies.jwt;
  const currentAccountByToken = await refreshTokenMethods.currentAccountByToken(refreshToken);

  if (!currentAccountByToken) {
    res.clearCookie(
      "jwt",
      {
        httpOnly: true,
        sameSite: "None",
        secure: true
      }
    )
    return res.sendStatus(204);
  }

  //delete refreshToken in db
  await refreshTokenMethods.deleteRefreshToken(currentAccountByToken.accountId);

  res.clearCookie(
    "jwt",
    {
      httpOnly: true,
      sameSite: "None",
      secure: true
    }
  );

  res.sendStatus(204);

});

module.exports = logout;