import { Link, Typography } from "@mui/material";
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const Breadcrumbs = ({path}) => {
  
  const components = path.split("/");
  const breadcrumbs = [];

  // Generate breadcrumbs for each component in the path
  for (let i = 1; i < components.length; i++) {
    const queryIndex = components[i].indexOf("?");
    const trimmedComponent = queryIndex >= 0 ? components[i].substring(0, queryIndex) : components[i];
    const component = trimmedComponent ? trimmedComponent: components[i];
    const linkPath = components.slice(0, i + 1).join("/");
    const label = component.charAt(0).toUpperCase() + component.slice(1);
    const isLast = i === components.length - 1;

    if (isLast) {
      breadcrumbs.push(
        <Typography key={i} className=" font-bold">
          {label}
        </Typography>
      );
    } else {
      breadcrumbs.push(
        <Link
          key={i}
          className="text-white hover:text-lightaccent-500"
          underline="hover"
          href={`${linkPath}`}
        >
          {label}
        </Link>
      );
    }
  }

  return (
    <div className=" p-2">
      <MuiBreadcrumbs
        separator={<NavigateNextIcon fontSize="small" className="text-lightshade-500" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs.map((breadcrumb, index) => (
          <span key={index}>{breadcrumb}</span>
        ))}
      </MuiBreadcrumbs>
    </div>
  );
};

export default Breadcrumbs;
