import { Router } from "express";
import listingRoutes from "./routes/listingRoutes";
import adminRoutes from "./routes/adminRoutes";
import authRoutes from "./routes/authRoutes";

const router = Router();

router.use("/listings", listingRoutes);
router.use("/admin", adminRoutes);
router.use("/auth", authRoutes);

export default router;
