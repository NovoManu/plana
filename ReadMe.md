# Installation

## Frontend

### Routing and layouts

There is layout system as top layer above vue router. New layouts could be added into `frontend/src/layouts` directory.
Each route could specify the used layout inside `meta.layout` property
For example:

```
[
    path: '/',
    name: 'Home',
    component: () => import('@/views/Index.vue'),
    meta: {
      layout: 'AppLayoutMain',
    },
]
```

The router will look for a layout with defined name or use default layout.
