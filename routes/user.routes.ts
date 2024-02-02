import { Router } from "express";
import { accessRefershToken, signinUser, signUpUser } from "../controllers/user.controller";

const router = Router();

router.route('/sign-in').post(signinUser)
router.route('/sign-up').post(signUpUser)
router.route('/refresh-token').post(accessRefershToken)

export default router


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoiYW51am5lbWE2M0BnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImFudWoiLCJmdWxsbmFtZSI6IkFudWogbmVtYSIsImlhdCI6MTcwNjg5MzMxOCwiZXhwIjoxNzA2OTc5NzE4fQ.jSaawUCGJQs3zAPpFu3sDsW5Lws4BobItFkzpfLCilQ


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTcwNjg5MzMxOCwiZXhwIjoxNzA2OTc5NzE4fQ.8xogGAl4DgUnGgJfFOzMLppuwAbAyVvqB-bP3pBSjZw
