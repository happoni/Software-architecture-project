// Here we'll define routing of a clients requests.

const ROUTES = [
	{
		url: '/test',
		auth: false,
		creditCheck: false,
		rateLimit: {

		},
		proxy: {
			target: "http://localhost:4001",
			changeOrigin: true,
			pathRewrite: {
				[`^/test`]: '',
			},
		}
	},
]

exports.ROUTES = ROUTES