"""

Revision ID: 39d17776c5c0
Revises: 2000d39799f2
Create Date: 2018-11-05 19:24:40.060550+00:00

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '39d17776c5c0'
down_revision = '2000d39799f2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('datasets', 'is_local')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('datasets', sa.Column('is_local', sa.BOOLEAN(), autoincrement=False, nullable=False))
    # ### end Alembic commands ###
