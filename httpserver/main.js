const MongoClient = require("mongodb");
const Admin = require("./admin");

MongoClient.connect(
	"mongodb+srv://<USER>:<PASSWORD>@<HOSTNAME>:<PORT>/myDatabase",
	{ useNewUrlParser: true },
).catch(err => {
	console.error(err.stack)
	process.exit(1)
}).then(async client => {
	console.log('Connected to MongoDB');
	Admin.injectDB(client);
})

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'MyVMS API',
			version: '1.0.0',
		},
		basePath: "/",
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				}
			}
		},
		security: [{
			bearerAuth: []
		}]
	},
	apis: ['./main.js'],
}
const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/register/security', async (req, res) => {
	console.log("Security registeration:")
	console.log(req.body);
	schemaSecurity = {
		SecurityName: req.body.SecurityName,
		SecurityPassword: req.body.SecurityPassword,
		SecurityEmail: req.body.SecurityEmail,
		SecurityContact: req.body.SecurityContact
	}
	const secure = await Security.register(schemaSecurity);
	if (secure.status == false) {
		return res.status(404).send("The name is already in use!")
	} 
	return res.status(200).send("Security Registeration Success")	
})

/**
 * @swagger
 * /register/security:
 *   post:
 *     description: Security registeration
 *     requestBody:
 *       require: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               SecurityName:
 *                 type: string
 *               SecurityPassword:
 *                 type: string
 *               SecurityEmail:
 *                 type: string
 *               SecurityContact:
 *                 type: string
 *     responses:
 *       200:
 *         description: Security Registeration Success
 *       404:
 *         description: The name is already in use!
 */

app.post('/loginSecurity', async (req, res) => {
	console.log("Security login:")
	console.log(req.body);
	const secure = await Security.login(req.body.SecurityName, req.body.SecurityPassword);

	if (secure.status == "Invalid password" || secure.status == "Invalid security name" ) {
		return res.status(404).send("Login failed")
	}

	res.status(200).json({
		SecurityName: secure.SecurityName,
		SecurityEmail: secure.SecurityEmail,
		SecurityContact: secure.SecurityContact,
		role: secure.role,
		token: generateAccessToken({
			SecurityName: secure.SecurityName,
			role: secure.role
		})
	})
})

/**
 * @swagger
 * /loginSecurity:
 *   post:
 *     description: Login as Security
 *     requestBody:
 *       require: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               SecurityName:
 *                 type: string
 *               SecurityPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SecurityInfo'
 *       404:
 *         description: Login failed
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SecurityInfo:
 *       type: object
 *       properties:
 *         SecurityName:
 *           type: string
 *         SecurityEmail: 
 *           type: string
 *         SecurityContact:
 *           type: string
 *         role:
 *           type: string
 */

app.patch('/security/updateGeneralInfoSecurity/:SecurityName', verifyToken, async (req, res) => {
	if (req.user.role == 'security') {
		console.log("Update General Info Security:")
		console.log(req.body);
		schemaSecurity = {
			SecurityName: req.params.SecurityName,
			SecurityEmail: req.body.SecurityEmail,
			SecurityContact: req.body.SecurityContact
		}
		const secure = await Security.updateGeneralSecurity(schemaSecurity);
		if (secure.status == false) {
			return res.status(404).send("Update failed")
		} 
	
		res.status(200).json({
			SecurityName: secure.SecurityName,
			SecurityEmail: secure.SecurityEmail,
			SecurityContact: secure.SecurityContact,
			role: secure.role
		})
	} else {
		return res.status(403).send('Unauthorized')
	}
})

/**
 * @swagger
 * /security/updateGeneralInfoSecurity/{SecurityName}:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     description: Update General Info Security
 *     parameters:
 *       - in: path  
 *         name: SecurityName
 *         schema:
 *           type: string
 *         required: true
 *         decription: Security Name
 *     requestBody:
 *       require: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               SecurityName:
 *                 type: string
 *               SecurityEmail:
 *                 type: string
 *               SecurityContact:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful update
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SecurityInfo'
 *       404:
 *         description: Update failed
 *       403:
 *         description: Unauthorized
 */

app.patch('/security/updatePasswordSecurity/:SecurityName', verifyToken, async (req, res) => {
	if (req.user.role == 'security') {
		console.log("Update Password Security:")
		console.log(req.body);
	
		const secure = await Security.updatePassSecurity(req.params.SecurityName, req.body.SecurityPassword);
		if (secure.status == false) {
			return res.status(404).send("Password update failed")
		} 
		res.status(200).send("Password update successful")
	} else {
		return res.status(403).send('Unauthorized')
	}
})

/**
 * @swagger
 * /security/updatePasswordSecurity/{SecurityName}:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     description: Update Password Security
 *     parameters:
 *       - in: path  
 *         name: SecurityName
 *         schema:
 *           type: string
 *         required: true
 *         decription: Security Name
 *     requestBody:
 *       require: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               SecurityPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password update successful
 *       404:
 *         description: Password update failed
 *       403:
 *         description: Unauthorized
 */



app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})

const jwt = require('jsonwebtoken');
function generateAccessToken(payload) {
	return jwt.sign(payload, "my-super-secret", { expiresIn: '1h' });
}

function verifyToken(req, res, next) {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

	if (token == null) {
		return res.sendStatus(401)
	}

	jwt.verify(token, "my-super-secret", (err, user) => {
		console.log(err)

		if (err) {
			return res.sendStatus(403)
		}
		req.user = user
		next()
	})
}

