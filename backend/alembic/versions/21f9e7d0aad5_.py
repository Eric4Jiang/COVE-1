"""empty message

Revision ID: 21f9e7d0aad5
Revises: 19342a5b0b77
Create Date: 2018-12-31 03:05:50.422921+00:00

"""
from alembic import op
import sqlalchemy as sa
import sqlalchemy_utils


# revision identifiers, used by Alembic.
revision = '21f9e7d0aad5'
down_revision = '19342a5b0b77'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('edit_request_messages', sa.Column('is_new_request', sa.Boolean(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('edit_request_messages', 'is_new_request')
    # ### end Alembic commands ###