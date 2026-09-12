from fastapi import FastAPI

from secure_agent_platform.api.health import router as health_router

app = FastAPI(
    title="Secure Agent Platform Lab",
    version="0.1.0",
    description="Production-like lab for secure and observable AI agent platform engineering.",
)

app.include_router(health_router)
