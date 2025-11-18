import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const AdminRoute = ({ element }) => {
  const user = useSelector((state) => state.user.value);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate("/");
    }
  }, [user]);

  return element;
};
