import Layout from "./layout";

import Dashboard from "./pages/Dashboard";

import ListFlashCards from "./pages/FlashCard";
import ListFlashCardByFuzzySearch from "./pages/FlashCard/search";
import ViewFlashCards from "./pages/FlashCard/view";
import CreateFlashCards from "./pages/FlashCard/create";
import UpdateFlashCards from "./pages/FlashCard/update";

import FlashCardSets from "./pages/FlashcardSets";
import ViewFlashCardSets from "./pages/FlashcardSets/view";
import CreateFlashCardSets from "./pages/FlashcardSets/create";
import UpdateFlashCardSets from "./pages/FlashcardSets/update";

import Languages from "./pages/Languages";
import ViewLanguage from "./pages/Languages/view";
import CreateLanguage from "./pages/Languages/create";
import UpdateLanguage from "./pages/Languages/update";

const routes = [
  {
    component: Layout,
    routes: [
      {
        path: "/",
        exact: true,
        component: Dashboard,
      },
      {
        path: "/cards",
        exact: true,
        component: ListFlashCards,
      },
      // {
      //   path: "/cards/filterbyparttls",
      //   exact: true,
      //   component: ListFlashCards,
      // },
      {
        path: "/cards/create",
        exact: true,
        component: CreateFlashCards,
      },
      {
        path: "/cards/update/:id",
        exact: true,
        component: UpdateFlashCards,
      },
      {
        path: "/cards/:id",
        exact: true,
        component: ViewFlashCards,
      },
      // {
      //   path: "/cards/search(\\?page=.*)?",
      //   exact: true,
      //   component: ListFlashCardByFuzzySearch,
      // },
      {
        path: "/cardsets",
        exact: true,
        component: FlashCardSets,
      },
      {
        path: "/cardsets/create",
        exact: true,
        component: CreateFlashCardSets,
      },
      {
        path: "/cardsets/update/:id",
        exact: true,
        component: UpdateFlashCardSets,
      },
      {
        path: "/cardsets/:id",
        exact: true,
        component: ViewFlashCardSets,
      },
      {
        path: "/language",
        exact: true,
        component: Languages,
      },
      {
        path: "/language/create",
        exact: true,
        component: CreateLanguage,
      },
      {
        path: "/language/update/:id",
        exact: true,
        component: UpdateLanguage,
      },
      {
        path: "/language/:id",
        exact: true,
        component: ViewLanguage,
      },
    ],
  },
];
export default routes;
