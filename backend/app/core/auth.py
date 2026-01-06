import fastapi
import httpx
from fastapi import Depends, HTTPException, Request, status
from clerk_backend_api.security.types import AuthenticateRequestOptions
from app.core.config import settings
from app.core.clerk import clerk

class AuthUser:
    def __init__(self, user_id: str, org_id: str, org_permissions: list):
        self.user_id = user_id
        self.org_id = org_id
        self.org_permissions = org_permissions

    def has_permission(self, permission: str) -> bool:
        return permission in self.org_permissions

    @property
    def can_view(self) -> bool:
        return self.has_permission("org:tasks:view")

    @property
    def can_create(self):
        return self.has_permission("org:tasks:create")

    @property
    def can_edit(self):
        return self.has_permission("org:tasks:edit")

    @property
    def can_delete(self):
        return self.has_permission("org:tasks:delete")

def convert_to_httpx_request(fastapi_request: Request) -> httpx.Request:
    return httpx.Request(method=fastapi_request.method,url=str(fastapi_request.url),headers=dict(fastapi_request.headers))

async def get_current_user(request: fastapi.Request) -> AuthUser:
    httpx_request = convert_to_httpx_request(request)
    request_state = clerk.authenticate_request(httpx_request,AuthenticateRequestOptions(authorized_parties=[settings.FRONTEND_URL]))

    if not request_state.is_signed_in:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Not authenticated")

    claims = request_state.payload
    user_id = claims.get("sub")
    org_id = claims.get("org_id")
    org_permissions = claims.get("permissions") or claims.get("org_permissions") or []

    if not user_id:
        raise(HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Not authenticated"))

    if not org_id:
        raise(HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Not authenticated"))

    return AuthUser(user_id=user_id, org_id=org_id, org_permissions=org_permissions)

def require_view(user: AuthUser = Depends(get_current_user)):
    if not user.can_view:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="View Permission Required")

    return user

def require_create(user: AuthUser = Depends(get_current_user)):
    if not user.can_create:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Create Permission Required")

    return user

def require_edit(user: AuthUser = Depends(get_current_user)):
    if not user.can_edit:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Edit Permission Required")

    return user

def require_delete(user: AuthUser = Depends(get_current_user)):
    if not user.can_delete:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Delete Permission Required")

    return user
