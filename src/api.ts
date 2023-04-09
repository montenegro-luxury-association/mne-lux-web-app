import { Router } from "express";
import listingRoutes from "./routes/listingRoutes";
import adminRoutes from "./routes/adminRoutes";

const router = Router();

router.use("/listings", listingRoutes);
router.use("/admin", adminRoutes);

export default router;
