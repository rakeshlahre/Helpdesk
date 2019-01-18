module.exports = (db) => {

  const logError = async (msg, stack, reqId, userId, source, query, code) => {
    await db.none('INSERT INTO error_logs (msg, stack, req_id, user_id, source, db_query, db_code) VALUES ($1, $2, $3, $4, $5, $6, $7)', [msg, stack, reqId, userId, source, query, code])
      .catch(error => {
        // Do not throw error from here to prevent infinite loop
        console.log('Error writing to error logs', error);
      });
  };

  const logUnhandledRejectionError = async (msg, stack) => {
    await db.none('INSERT INTO error_logs (msg, stack, req_id, user_id, source, db_query, db_code) VALUES ($1, $2, $3, $4, $5, $6, $7)', [msg, stack, null, null, 'unhandledRejection', null, null])
      .catch(error => {
        // Do not throw error from here to prevent infinite loop
        console.log('Error writing to error logs', error);
      });
  };

  const logUncaughtExceptionError = async (msg, stack) => {
    await db.none('INSERT INTO error_logs (msg, stack, req_id, user_id, source, db_query, db_code) VALUES ($1, $2, $3, $4, $5, $6, $7)', [msg, stack, null, null, 'uncaughtException', null, null])
      .catch(error => {
        // Do not throw error from here to prevent infinite loop
        console.log('Error writing to error logs', error);
      });
  };

  return {
    logError,
    logUnhandledRejectionError,
    logUncaughtExceptionError,
  };
};
