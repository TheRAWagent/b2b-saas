import uuid
from datetime import datetime
from sqlalchemy import Column, String, Text, DateTime, Enum
import enum
from app.core.database import Base

class TaskStatus(str, enum.Enum):
    PENDING = "PENDING"
    STARTED = "STARTED"
    COMPLETED = "COMPLETED"

class Task(Base):
    __tablename__ = "tasks"

    id = Column(String, primary_key=True, default= lambda : str(uuid.uuid4()))
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    status = Column(Enum(TaskStatus), default=TaskStatus.PENDING, nullable=False)
    org_id = Column(String, nullable=False,index=True)
    created_by = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow())
    updated_by = Column(String, nullable=False, default=datetime.utcnow())
