import DesktopApp from "@/components/desktop-app"
import { ProtectedRoute } from "../components/ProtectedRoute";


export default function Home() {
  return( <ProtectedRoute><DesktopApp /></ProtectedRoute> )
}
