import { Router } from "express";
import { issuesController } from "./issues.controller";
import auth from "../../middleware/auth";
import { USER_ROLES } from "../../types";

const router = Router();


router.post('/', auth(USER_ROLES.maintainer, USER_ROLES.contributor), issuesController.createIssue);
router.get('/', auth(USER_ROLES.maintainer, USER_ROLES.contributor), issuesController.getAllIssues);

export const issuesRouter = router;