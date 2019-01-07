module.exports = {
    tableName: 'User',
    schema: true,
    autoCreatedAt: 'created_at',
    autoUpdatedAt: 'updated_at',
    attributes: {
        id: {
            type: 'string',
            size: 36,
            primaryKey: true,
            unique: true
        },
        email: {
            type: 'string',
            size: 255,
            required: true,
            unique: true
        },
        username: {
            type: 'string',
            size: 255,
            required: true,
            unique: true
        },
        pass: {
          type: 'string',
          required: true
        },
    },

    customToJSON: function () {
      return _.omit(this, ['pass'])
    },

    getUserData: function (username) {
       User.findOne({
            username: username
        }, 
        function (err, userDetails) {
            if (userDetails) {
                Promise.resolve(userDetails)
            } else {
                var err = new Error('Failed to update content because id is invalid');
                err.statusCode = 404;
                Promise.reject(err)
            }
       });
    }
}