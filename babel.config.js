let objectConfig = {};
if (process.env.NODE_ENV === "test") {
	objectConfig = {presets: ['@babel/preset-env', '@babel/preset-react']}
}
else{
	objectConfig = {
		presets: [
      		"@babel/preset-react",
		      [
		          "@babel/preset-env",
		          {
		              "targets": {
		                  "browsers": "last 2 versions"
		              },
		              "modules": false,
		              "loose": false
		          }
		      ]
		  ],
		  plugins: [
			  'react-hot-loader/babel'
		  ]
	}
}

module.exports = objectConfig